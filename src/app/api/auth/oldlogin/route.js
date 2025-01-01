import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json(); // Отримуємо тіло запиту
    const { email, password } = body;

    // Перевіряємо, чи передані email і password
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email and password are required' }),
        { status: 400 }
      );
    }

    // Знаходимо користувача за email
    const user = await prisma.user.findUnique({
      where: { email },
    });



    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // Перевіряємо, чи пароль правильний
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return new Response(
        JSON.stringify({ message: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // Генеруємо JWT
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    const username = { username: user.username, category: user.category }

    return new Response(JSON.stringify({ token, username }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
