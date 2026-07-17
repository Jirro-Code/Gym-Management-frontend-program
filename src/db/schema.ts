import { mysqlTable, varchar, text, timestamp, int, date} from "drizzle-orm/mysql-core";
import {relations} from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

//user schema table
export const users = mysqlTable("users", {
    id: varchar("id", { length: 36 }).primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

//exercise schema table
export const exercises = mysqlTable("exercises", {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", {length: 36}).references(() => users.id, {
        onDelete: "cascade",
    }).notNull(),
    exerciseName: varchar("exercise_name", { length: 255 }).notNull(),
    description: text("description"),
    repetitions: int("repetitions"),
    sets: int("sets"),
    exerciseDate: date("exercise_date").notNull(),
})

export const userRelation = relations(users, ({ many }) => ({
    exercises: many(exercises),
}));

export const exerciseRelation = relations(exercises, ({ one }) => ({
    user: one(users, {
        fields: [exercises.userId],
        references: [users.id],
    }),
}));

//for validation and type inference
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Exercise = typeof exercises.$inferSelect;
export type NewExercise = typeof exercises.$inferInsert;

export const insertUserSchema = createInsertSchema(users).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const selectUserSchema = createSelectSchema(users);