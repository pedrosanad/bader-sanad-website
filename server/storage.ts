import {
  type User,
  type InsertUser,
  type Booking,
  type InsertBooking,
  type AvailabilitySlot,
  type InsertAvailabilitySlot,
  type PortfolioImage,
  type InsertPortfolioImage,
  users,
  bookings,
  availabilitySlots,
  portfolioImages,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  deleteBooking(id: string): Promise<boolean>;

  getAvailabilitySlots(date?: string): Promise<AvailabilitySlot[]>;
  createAvailabilitySlot(slot: InsertAvailabilitySlot): Promise<AvailabilitySlot>;
  deleteAvailabilitySlot(id: string): Promise<boolean>;
  markSlotUnavailable(date: string, time: string): Promise<void>;
  markSlotAvailable(date: string, time: string): Promise<void>;

  getPortfolioImages(category?: string): Promise<PortfolioImage[]>;
  createPortfolioImage(image: InsertPortfolioImage): Promise<PortfolioImage>;
  deletePortfolioImage(id: string): Promise<boolean>;
}

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

class MemoryStorage implements IStorage {
  private users: User[] = [];
  private bookings: Booking[] = [];
  private slots: AvailabilitySlot[] = [];
  private images: PortfolioImage[] = [];

  async getUser(id: string) { return this.users.find(u => u.id === id); }
  async getUserByUsername(username: string) { return this.users.find(u => u.username === username); }
  async createUser(u: InsertUser): Promise<User> {
    const user = { ...u, id: uuid() } as User;
    this.users.push(user);
    return user;
  }

  async getBookings() { return [...this.bookings]; }
  async getBooking(id: string) { return this.bookings.find(b => b.id === id); }
  async createBooking(b: InsertBooking): Promise<Booking> {
    const booking: Booking = { ...b, id: uuid(), status: "confirmed", createdAt: new Date(), email: b.email ?? null, message: b.message ?? null };
    this.bookings.push(booking);
    return booking;
  }
  async updateBookingStatus(id: string, status: string) {
    const b = this.bookings.find(b => b.id === id);
    if (!b) return undefined;
    b.status = status;
    return b;
  }
  async deleteBooking(id: string) {
    const i = this.bookings.findIndex(b => b.id === id);
    if (i === -1) return false;
    this.bookings.splice(i, 1);
    return true;
  }

  async getAvailabilitySlots(date?: string) {
    return this.slots.filter(s => s.isAvailable && (!date || s.date === date));
  }
  async createAvailabilitySlot(slot: InsertAvailabilitySlot): Promise<AvailabilitySlot> {
    const existing = this.slots.find(s => s.date === slot.date && s.time === slot.time);
    if (existing) { existing.isAvailable = true; return existing; }
    const s: AvailabilitySlot = { ...slot, id: uuid() };
    this.slots.push(s);
    return s;
  }
  async deleteAvailabilitySlot(id: string) {
    const i = this.slots.findIndex(s => s.id === id);
    if (i === -1) return false;
    this.slots.splice(i, 1);
    return true;
  }
  async markSlotUnavailable(date: string, time: string) {
    const s = this.slots.find(s => s.date === date && s.time === time);
    if (s) s.isAvailable = false;
  }
  async markSlotAvailable(date: string, time: string) {
    const s = this.slots.find(s => s.date === date && s.time === time);
    if (s) s.isAvailable = true;
  }

  async getPortfolioImages(category?: string) {
    return this.images.filter(img => !category || img.category === category);
  }
  async createPortfolioImage(image: InsertPortfolioImage): Promise<PortfolioImage> {
    const img: PortfolioImage = { ...image, id: uuid(), displayOrder: image.displayOrder ?? "0" };
    this.images.push(img);
    return img;
  }
  async deletePortfolioImage(id: string) {
    const i = this.images.findIndex(img => img.id === id);
    if (i === -1) return false;
    this.images.splice(i, 1);
    return true;
  }
}

class DatabaseStorage implements IStorage {
  async getUser(id: string) {
    const result = await db!.select().from(users).where(eq(users.id, id));
    return result[0];
  }
  async getUserByUsername(username: string) {
    const result = await db!.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db!.insert(users).values(insertUser).returning();
    return result[0];
  }
  async getBookings() { return db!.select().from(bookings).orderBy(bookings.date); }
  async getBooking(id: string) {
    const result = await db!.select().from(bookings).where(eq(bookings.id, id));
    return result[0];
  }
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const result = await db!.insert(bookings).values(booking).returning();
    await this.markSlotUnavailable(booking.date, booking.time);
    return result[0];
  }
  async updateBookingStatus(id: string, status: string) {
    const booking = await this.getBooking(id);
    if (!booking) return undefined;
    const result = await db!.update(bookings).set({ status }).where(eq(bookings.id, id)).returning();
    if (status === "cancelled" && booking.date && booking.time) {
      await this.markSlotAvailable(booking.date, booking.time);
    }
    return result[0];
  }
  async deleteBooking(id: string) {
    const booking = await this.getBooking(id);
    if (!booking) return false;
    const result = await db!.delete(bookings).where(eq(bookings.id, id)).returning();
    if (result.length > 0 && booking.date && booking.time) {
      await this.markSlotAvailable(booking.date, booking.time);
    }
    return result.length > 0;
  }
  async getAvailabilitySlots(date?: string) {
    if (date) return db!.select().from(availabilitySlots).where(and(eq(availabilitySlots.date, date), eq(availabilitySlots.isAvailable, true)));
    return db!.select().from(availabilitySlots).where(eq(availabilitySlots.isAvailable, true));
  }
  async createAvailabilitySlot(slot: InsertAvailabilitySlot): Promise<AvailabilitySlot> {
    const existing = await db!.select().from(availabilitySlots).where(and(eq(availabilitySlots.date, slot.date), eq(availabilitySlots.time, slot.time)));
    if (existing.length > 0) {
      if (!existing[0].isAvailable) {
        const result = await db!.update(availabilitySlots).set({ isAvailable: true }).where(eq(availabilitySlots.id, existing[0].id)).returning();
        return result[0];
      }
      return existing[0];
    }
    const result = await db!.insert(availabilitySlots).values(slot).returning();
    return result[0];
  }
  async deleteAvailabilitySlot(id: string) {
    const result = await db!.delete(availabilitySlots).where(eq(availabilitySlots.id, id)).returning();
    return result.length > 0;
  }
  async markSlotUnavailable(date: string, time: string) {
    await db!.update(availabilitySlots).set({ isAvailable: false }).where(and(eq(availabilitySlots.date, date), eq(availabilitySlots.time, time)));
  }
  async markSlotAvailable(date: string, time: string) {
    await db!.update(availabilitySlots).set({ isAvailable: true }).where(and(eq(availabilitySlots.date, date), eq(availabilitySlots.time, time)));
  }
  async getPortfolioImages(category?: string) {
    if (category) return db!.select().from(portfolioImages).where(eq(portfolioImages.category, category));
    return db!.select().from(portfolioImages);
  }
  async createPortfolioImage(image: InsertPortfolioImage): Promise<PortfolioImage> {
    const result = await db!.insert(portfolioImages).values(image).returning();
    return result[0];
  }
  async deletePortfolioImage(id: string) {
    const result = await db!.delete(portfolioImages).where(eq(portfolioImages.id, id)).returning();
    return result.length > 0;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemoryStorage();
