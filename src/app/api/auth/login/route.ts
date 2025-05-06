import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // E-posta ve şifre alanlarının boş olup olmadığını kontrol et
    if (!email || !password) {
      return NextResponse.json(
        { message: "E-posta ve şifre zorunludur." },
        { status: 400 }
      );
    }

    // Kullanıcıyı e-posta adresine göre bul
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        role: true,
        client: {
          select: {
            id: true,
          },
        },
        lawyer: {
          select: {
            id: true,
          },
        },
      },
    });

    // Kullanıcı bulunamadıysa hata döndür
    if (!user) {
      return NextResponse.json(
        { message: "Geçersiz e-posta veya şifre." },
        { status: 401 }
      );
    }

    // Şifre doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Geçersiz e-posta veya şifre." },
        { status: 401 }
      );
    }

    // Hassas verileri çıkararak kullanıcı bilgilerini döndür
    return NextResponse.json({
      message: "Giriş başarılı!",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profileId: user.role === 'LAWYER' ? user.lawyer?.id : user.client?.id
      },
    });
    
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Giriş sırasında bir hata oluştu.", error: error.message },
      { status: 500 }
    );
  }
}