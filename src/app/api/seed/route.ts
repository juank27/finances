import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const defaultCategories = [
  { name: 'Alimentación', color: '#EF4444' },
  { name: 'Transporte', color: '#3B82F6' },
  { name: 'Vivienda', color: '#10B981' },
  { name: 'Entretenimiento', color: '#F59E0B' },
  { name: 'Salud', color: '#8B5CF6' },
  { name: 'Educación', color: '#EC4899' },
  { name: 'Ropa', color: '#6B7280' },
  { name: 'Otros', color: '#F97316' },
]

export async function POST() {
  try {
    const existingCategories = await prisma.category.count()
    
    if (existingCategories > 0) {
      return NextResponse.json({ message: 'Categories already exist' })
    }

    await prisma.category.createMany({
      data: defaultCategories
    })

    return NextResponse.json({ 
      message: 'Default categories created successfully',
      count: defaultCategories.length 
    })
  } catch (error) {
    console.error('Error seeding categories:', error)
    return NextResponse.json(
      { error: 'Error creating default categories' },
      { status: 500 }
    )
  }
}