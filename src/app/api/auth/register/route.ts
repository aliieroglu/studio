import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log("Gelen kayıt verisi:", JSON.stringify(body, null, 2));
    
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      role, 
      // Müvekkil alanları
      tcKimlik, birthDate, phone, address, 
      // Avukat alanları
      lawyerTcKimlik, lawyerBirthDate, lawyerPhone, barRegistrationNumber, specialization 
    } = body;

    // Kullanıcının zaten var olup olmadığını kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Bu e-posta adresi zaten kullanılıyor." },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Role enum değerini normalize et
    const normalizedRole = role.toUpperCase() === "LAWYER" ? "LAWYER" : "CLIENT";

    // Tarih değerlerini güvenli bir şekilde işle
    let clientBirthDate = null;
    let lawyerBirthDateObj = null;
    
    try {
      if (role === "client" && birthDate) {
        clientBirthDate = new Date(birthDate);
      }
      
      if (role === "lawyer" && lawyerBirthDate) {
        lawyerBirthDateObj = new Date(lawyerBirthDate);
      }
    } catch (e) {
      console.error("Tarih dönüşüm hatası:", e);
      return NextResponse.json(
        { message: "Geçersiz tarih formatı." },
        { status: 400 }
      );
    }

    // Transaction kullanarak atomik işlem gerçekleştir
    const result = await prisma.$transaction(async (tx) => {
      // Kullanıcı oluştur
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          role: normalizedRole,
        },
      });

      // Role göre ilgili profili oluştur
      if (role.toLowerCase() === "client") {
        await tx.client.create({
          data: {
            userId: user.id,
            tcKimlik: tcKimlik || "",
            birthDate: clientBirthDate || new Date(),
            phone: phone || "",
            address: address || "",
          },
        });
      } else if (role.toLowerCase() === "lawyer") {
        await tx.lawyer.create({
          data: {
            userId: user.id,
            tcKimlik: lawyerTcKimlik || "",
            birthDate: lawyerBirthDateObj || new Date(),
            phone: lawyerPhone || "",
            barRegistrationNumber: barRegistrationNumber || "",
            specialization: specialization || "",
          },
        });
      }

      return user;
    });

    // Hassas verileri içermeden başarılı yanıt dön
    return NextResponse.json(
      { 
        message: "Kayıt başarılı!",
        user: { 
          id: result.id,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          role: result.role 
        } 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Kayıt sırasında bir hata oluştu.", error: error.message },
      { status: 500 }
    );
  }
}