import AppBar from "./AppBar"

export default function FullBlog ()  {
  return(
    <div className="w-full">
        <AppBar publishABlog={false}/>
        <div className="flex flex-col px-8  lg:flex-row lg:justify-center gap-10 mt-20 ">
            <div className="lg:w-[550px] flex flex-col gap-2 ">
                <div className="text-4xl font-extrabold">Title Lorem ipsum dolor sit amet.</div>
                <div className="font-extralight">Date Lorem, ipsum dolor.</div>
                <div className="mt-2">Content Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, similique maiores voluptatem a vel iste laborum explicabo minus fuga doloremque eum asperiores pariatur rem exercitationem praesentium. Nemo suscipit, blanditiis at esse perferendis inventore vero? Reprehenderit unde commodi tempore dolore quisquam aperiam natus vitae earum, deserunt velit? Nemo eos, aperiam tempore in iste ut doloremque expedita omnis numquam voluptates tempora ipsam harum repellendus voluptate a perspiciatis eum culpa odit possimus. Distinctio expedita libero veniam sapiente. Minima molestiae nisi sit, exercitationem quia quo ipsa dicta at aut, ullam rem cum iusto aspernatur blanditiis soluta. Sed distinctio aliquid doloribus unde neque, in blanditiis est dolores eveniet qui. Molestiae officia fugiat laudantium maiores non in dolorum debitis perspiciatis exercitationem animi, sapiente minus aliquid eum facilis reiciendis est fugit ipsa ab illum! Iusto explicabo, sapiente quae pariatur impedit repellendus animi voluptate molestiae distinctio est. Beatae ad delectus assumenda blanditiis, quidem voluptatum dolores adipisci commodi temporibus natus soluta accusamus facilis ipsa totam. Ipsum, vero debitis. Maiores tenetur aut eaque nemo vitae architecto sit atque eligendi doloremque. Placeat a aliquam fugiat at doloremque ullam neque minus consequuntur impedit harum, officiis laborum distinctio veniam, nostrum facere magni perspiciatis fugit perferendis aliquid ratione, aperiam saepe dignissimos. Debitis distinctio corporis accusamus ex error cum nulla, numquam perspiciatis reprehenderit ratione tempore expedita nobis commodi molestiae! Incidunt voluptatibus repellat totam, eaque delectus cupiditate. Tempora omnis eos ea earum, laudantium eum odio esse, voluptates repudiandae ullam pariatur assumenda adipisci modi ratione. Fugit tenetur hic voluptate tempore ea suscipit, explicabo quibusdam ad dolores. Rem cum saepe delectus neque accusantium eius voluptas nemo iusto rerum qui commodi vel molestias at alias a ea magni vitae labore, error iste quas quod? Magnam tempore numquam dolore eveniet laborum, hic in sit, inventore officiis voluptatem vitae! Dolore expedita fuga pariatur cupiditate rem facilis eligendi ad amet veritatis, itaque odio sapiente qui omnis dolores labore necessitatibus aliquam numquam molestias architecto perspiciatis aliquid similique recusandae vel quo. Eum nobis quidem debitis magni repellat est expedita quam labore aliquid accusantium vel sapiente totam odio ipsa quae non velit ducimus quasi, hic error officia cupiditate! Deleniti, reprehenderit autem quae labore esse saepe nam, perferendis voluptates, ipsam dicta sint? Expedita cum, quis debitis sint eaque qui enim a rerum magni, consequatur reprehenderit ipsam cumque delectus perferendis sapiente placeat? Dicta delectus unde ex necessitatibus quo? Eaque quaerat dolor praesentium deserunt qui eveniet eum eos dicta perferendis, inventore aperiam omnis ullam nostrum beatae atque maiores hic nihil et optio minima quas vel. Facere architecto corporis repellat sit ipsum voluptatum maiores excepturi perspiciatis cum? Accusantium, velit obcaecati maxime ea, nostrum iusto quibusdam in explicabo suscipit eligendi consequuntur a voluptate quo tenetur? Illo reiciendis, deleniti maxime dignissimos accusantium itaque ipsa voluptates perspiciatis tempora aperiam unde optio, in at magnam culpa adipisci! Corporis aspernatur consequuntur vel aliquam ad minima nam sapiente dolores excepturi ex fuga placeat vero at laboriosam tenetur, totam illo unde repellat architecto obcaecati? Animi incidunt, nemo cupiditate iste, qui praesentium provident soluta quas architecto eligendi tempore recusandae consectetur quam esse. Odio magnam sed minima aut.</div>
            </div>
            <div className="lg:w-[400px] flex flex-col ">
                <div className="font-bold">Author</div>
                <div className="flex gap-4  items-center py-2 mb-6">
                    <div className="w-10 h-10 p-3 flex justify-center items-center rounded-full bg-slate-200">AK</div>
                    <div className="flex flex-col gap-2">
                        <div className="font-extrabold">Aditya Karki</div>
                        <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eaque consectetur quis totam odit error.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

