import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';



const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function getStaticProps() {
  //await supabaseAdmin.from('images').insert([{
  //  name: 'Pedro Duarte',
  //  href: 'https://twitter.com/peduarte/status/1463897468383412231',
  //  username: '@peduarte',
  //  imageSrc: 'https://katkzhgmwoqfjrdvgtqr.supabase.co/storage/v1/object/sign/images-links/1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMtbGlua3MvMS5wbmciLCJ0cmFuc2Zvcm1hdGlvbnMiOiIiLCJpYXQiOjE2NzIxNzYwNTUsImV4cCI6MTk4NzUzNjA1NX0.Kl9B9-RhPtW-32kgU61Gkqq4RxPHc3k8b8PFtQXHjj0',
  //}]);
//
  
  //supabaseAdmin.storage.from('bucket').getPublicUrl('13.png', {
  //  transform: {
  //    width: 500,
  //    height: 600,
  //  },
  //})

  //await supabaseAdmin.from('images').insert([{
  //  name: 'Pedro Duarte',
  //  href: 'https://twitter.com/peduarte/status/1463897468383412231',
  //  username: '@peduarte',
  //  imageSrc: 'https://pbs.twimg.com/media/FFDOtLkWYAsWjTM?format=jpg',
  //}]);
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
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
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
    <a href={image.href} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
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
      <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </a>
  );
}




