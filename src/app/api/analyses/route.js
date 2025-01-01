import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Отримання заголовку Authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // TODO: Додати логіку перевірки токену (JWT або інший механізм)

    // Отримання даних аналізів із бази даних
    const analyses = await prisma.analysis.findMany();

    return new Response(
      JSON.stringify(analyses),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching analyses:', error);
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


// POST: Додати новий аналіз
export async function POST(req) {
  try {
    const body = await req.json();

    const newAnalysis = await prisma.analysis.create({
      data: body,
    });

    return new Response(JSON.stringify(newAnalysis), { status: 201 });
  } catch (error) {
    console.error('Error creating analysis:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// PUT: Оновити аналіз за ID
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
    }

    const updatedAnalysis = await prisma.analysis.update({
      where: { id },
      data,
    });

    return new Response(JSON.stringify(updatedAnalysis), { status: 200 });
  } catch (error) {
    console.error('Error updating analysis:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE: Видалити аналіз за ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
    }

    await prisma.analysis.delete({
      where: { id: parseInt(id, 10) },
    });

    return new Response(JSON.stringify({ message: 'Analysis deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting analysis:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}