import { NextResponse } from "next/server";


export async function GET(){
try {
    const response = NextResponse.json({
        success:true,
        msg:"logout successfully"
    })
    response.cookies.set("utoken", '', {httpOnly:true})
    return response;
} catch (error) {
    NextResponse.json({msg:error.message})
}
}