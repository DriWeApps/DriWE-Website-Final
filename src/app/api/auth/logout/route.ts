// import { serialize } from 'cookie';

// export async function POST() {
//     const cookie = serialize('token', '', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         path: '/',
//         expires: new Date(0),
//     });

//     return new Response(
//         JSON.stringify({
//             success: true,
//         }),
//         {
//             status: 200,
//             headers: {
//                 'Set-Cookie': cookie,
//             },
//         }
//     );
// }



import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return response;
}