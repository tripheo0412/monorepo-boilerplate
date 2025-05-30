import {Migration} from '@mikro-orm/migrations'

export class Migration20250529193507 extends Migration {
	override async up(): Promise<void> {
		// Create users table with new schema
		this.addSql(`
      create table "users" (
        "id" uuid not null default gen_random_uuid(),
        "createdAt" timestamptz not null,
        "lastUpdatedAt" timestamptz not null,
        "deletedAt" timestamptz null,
        "email" varchar(255) not null,
        "firstname" varchar(255) not null,
        "lastname" varchar(255) not null,
        "password" varchar(255) not null,
        "agreedToTerms" boolean not null default false,
        constraint "users_pkey" primary key ("id")
      );
    `)

		// Add unique constraint on email
		this.addSql(
			`alter table "users" add constraint "users_email_unique" unique ("email");`,
		)
	}

	override async down(): Promise<void> {
		// Drop users table
		this.addSql(`drop table if exists "users" cascade;`)
	}
}
