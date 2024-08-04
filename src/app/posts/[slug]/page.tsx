import prisma from "@/lib/db";
import {unstable_cache as  cache } from "next/cache";



const getCachedPost = cache((slug)=>{
  return prisma.post.findUnique({
    where:{
      slug
    }
  })
})





interface PostsPageProps {
  params: {
    slug: string;
  };
}

const PostsPage = async ({ params }: PostsPageProps) => {

  const post = await getCachedPost(params.slug)
// cached the slug for cacheing sotring and then retreiving the result faster optimizing performance 
//prisma accelarate offers arious cahche perfomance optimizations too 
    
  
    return (
        <main className="flex flex-col items-center gap-y-5 text-center pt-24">
          <h1 className="font-semibold text-3xl">{post?.title}</h1>
          <div>{post?.content}</div>

         
        </main>
      );
    };
    
    export default PostsPage;
