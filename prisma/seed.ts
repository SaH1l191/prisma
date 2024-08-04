import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPosts : Prisma.PostCreateInput[] = [
    {
        title:'Posts 1',
        slug :'post-1',
        content:'Content 0 ',
        author:{
            connectOrCreate:{
                where:{
                    email:"random@gmail.com"
                },
                create:{
                    email:"random@gmail.com",
                    hashedPassword:"sdalfsccxzcxzwefwad2234asdf"
                }
            }
        }
    }
]
//creating a dummy data to insert into db during db changes .initial datat.
// line 3125

async function main (){
    console.log("Start Seeding...")
    for(const post of initialPosts){
        const newPost = await prisma.post.create({
            data:post
        })
        console.log(`Created post with id ${newPost.id}`)
    }
    console.log("Seeding finished")
}

main().then(async()=>{
    await prisma.$disconnect()
}).catch(async(e)=>{
    console.log("Erorr" , e)
    await prisma.$disconnect()
    process.exit(1)
})

//seed runs bcz added prisma seed in package.json at last of the file
//but before do npm i ts-node -D
//and run npx prisma db seed 