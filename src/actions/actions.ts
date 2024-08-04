"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"



export async function createPost(formData :FormData){
   await prisma.post.create({
    data:{
        title:formData.get("title") as string,
        slug : (formData.get("title") as string).replace(/\s+/g,"-")
        .toLowerCase(),
        content:formData.get("content") as string,
        author:{
            connect:{
                email:"random@gmail.com"
            }
        }
    }
   })

   revalidatePath("/posts")
}
// revalidate to re render the posts page again . no need to refresh manually 


// /\s+/: This is a regular expression (regex) pattern.

// / /: Delimiters that indicate the start and end of the regular expression.
// \s: A shorthand character class that matches any whitespace character, including spaces, tabs, and newline characters.
// +: A quantifier that matches one or more of the preceding character (in this case, one or more whitespace characters).

export async function editPost(formData :FormData,id:string){
    await prisma.post.update({
        where:{ id },
        data:{
            title:formData.get("title") as string,
            slug:(formData.get("title") as string)
            .replace(/\s+/g,"-").toLowerCase(),
            content:formData.get('content') as string
        }
    })
 }

export async function deletePost(id:string){
    await prisma.post.delete({
        where:{ id },
    })
 }