import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json(); // Отримуємо тіло запиту
    const { username, email, password, department, category } = body;
    // Перевірка обов'язкових полів
    if (!username || !email || !password || !department || !category) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400 }
      );
    }

    // Перевірка, чи користувач вже існує
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User with this email already exists' }),
        { status: 400 }
      );
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        department,
        category,
      },
    });

    return new Response(
      JSON.stringify({ message: 'User created successfully', user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
