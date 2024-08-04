import { createPost } from "@/actions/actions"
import prisma from "@/lib/db"
import Link from "next/link"


export default async function PostsPage(){

    // const posts = await prisma.post.findMany({
    //    orderBy:{
    //     createdAt:"desc"
    //    },
    //    select:{
    //     id:true,
    //     title:true,
    //     slug:true,
    //    }
    // })
//if we only want to display few pages out of 100 use take:1 skip:2 type 
    
    // const postsCount = await prisma.post.count()

    const user = await prisma.user.findUnique({
        where:{
            email:"random@gmail.com"
        },
        include:{
            posts : true 
        }
    })



return (
        <main className="flex flex-col items-center gap-y-5 text-center pt-24">
            <h1 className="font-semibold text-3xl  ">All Posts {user?.posts.length}</h1>
            <ul className="border-t border-b border-black/10 py-5 leading-8">
                {
                   user?.posts.map((post)=>(
                    <li key={post.slug} className="flex items-center justify-between px-5">
                        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </li>
                   ))
                }

            </ul>
            <div className="b-slate-100">
            <form action={createPost}  className="flex flex-col gap-y-2">
                <input type="text" name="title" placeholder="Title"
                className="px-2 py-1 rounded-sm"/>
                <textarea name="content" rows={5} placeholder="content"
                className="px-2 py-1 rounded-sm"/>
                <button type="submit" className="bg-blue">Submit</button>
            </form>
          </div>

           
        </main>
    )


}