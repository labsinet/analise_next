import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log('Successfully connected to database'))
  .catch((e) => console.error('Error connecting to database:', e));

// Helper function to check user authorization
async function checkAuthorization(req) {
  const session = await getServerSession();
  
  if (!session) {
    return { authorized: false, error: 'Unauthorized' };
  }
  
  return { authorized: true, session };
}

export async function GET(req) {
  let analyses = await prisma.analysis.findMany();
     
  try {
    console.log('Starting GET request');
    const auth = await checkAuthorization();
    //console.log('Auth result:', auth);
    
    if (!auth.authorized) {
      return new Response(
        JSON.stringify({ message: auth.error }),
        { status: 401 }
      );
    }

    // Get analyses based on user role
    let analyses;
    if (auth.session.user.role === 'admin') {
      analyses = await prisma.analysis.findMany();
      
    } else {
      // Regular users can only see their own analyses
      analyses = await prisma.analysis.findMany({
        where: {
          id_user: auth.session.user.id
        }
      });
    }

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

export async function POST(req) {
  try {
    const auth = await checkAuthorization(req);
    if (!auth.authorized) {
      return new Response(
        JSON.stringify({ message: auth.error }),
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Add user ID from session to the data
    const data = {
      ...body,
      id_user: auth.session.user.id
    };

    const newAnalysis = await prisma.analysis.create({
      data
    });

    return new Response(JSON.stringify(newAnalysis), { status: 201 });
  } catch (error) {
    console.error('Error creating analysis:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req) {
  try {
    const auth = await checkAuthorization(req);
    if (!auth.authorized) {
      return new Response(
        JSON.stringify({ message: auth.error }),
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
    }

    // Check if user has permission to update this analysis
    const existingAnalysis = await prisma.analysis.findUnique({
      where: { id }
    });

    if (!existingAnalysis) {
      return new Response(JSON.stringify({ message: 'Analysis not found' }), { status: 404 });
    }

    if (existingAnalysis.id_user !== auth.session.user.id && auth.session.user.role !== 'admin') {
      return new Response(JSON.stringify({ message: 'Not authorized to update this analysis' }), { status: 403 });
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

export async function DELETE(req) {
  try {
    const auth = await checkAuthorization(req);
    if (!auth.authorized) {
      return new Response(
        JSON.stringify({ message: auth.error }),
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
    }

    // Check if user has permission to delete this analysis
    const existingAnalysis = await prisma.analysis.findUnique({
      where: { id: parseInt(id, 10) }
    });

    if (!existingAnalysis) {
      return new Response(JSON.stringify({ message: 'Analysis not found' }), { status: 404 });
    }

    if (existingAnalysis.id_user !== auth.session.user.id && auth.session.user.role !== 'admin') {
      return new Response(JSON.stringify({ message: 'Not authorized to delete this analysis' }), { status: 403 });
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