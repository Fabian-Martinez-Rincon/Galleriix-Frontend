import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import json from '../images.json'


// Usage



type ImageJson = {
  name: string
  href: string
  url :{
    publicUrl:string
    }
  }


export async function getStaticProps() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey)
  const { data } = await supabaseAdmin.from('images').select('*');

  
  

  return {
    props: {
      images: data
    }
  };
}

type Image = {
  id: number
  href: string
  imageSrc: string
  name: string
  username: string
}

export default function Gallery({ images }: { images: Image[] }) {
  //json.forEach((item:any) => {
  //  console.log(item)
  //})
  console.clear
  console.log('Dios: ',json[0].name)
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <a href = 'https://www.instagram.com/nomadiixlogos/' className="mt-1 mb-10 text-5xl font-medium text-gray-100 flex flex-col items-center border-slate-600 border-y-4 hover:opacity-75 duration-700 ease-in-out"> NOMADIIX-LOGOS </a>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>

    </div>

    
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href={image.href} className="group ">
      
      <div className="w-full border-slate-600 border-y-4 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        
        <Image
          alt=""
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-100">{image.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-100">{image.username}</p>
    </a>
  );
}




