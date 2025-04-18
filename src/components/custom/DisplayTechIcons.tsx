import React from 'react'
import { getTechLogos } from '../../../utils/utils'
import Image from 'next/image';
import { cn } from '../../../utils/utils';

const DisplayTechIcons = async ({techStack}:TechIconProps) => {
    const techLogos = await getTechLogos(techStack);

  return (
    <div className='flex flex-row'>
        {techLogos.slice(0,3).map(({tech , url} , index) => (
            <div key={tech} className={cn('relative group bg-dark-300 rounded-full p-2 flex-center' , index >=1 && 'ml-[-10px]') }>
                <span className="tech-tooltip">{tech}</span>
                <Image src={url} alt={tech} width={100} height={100} className='object-fit size-5'  />
            </div>
        ))}

    </div>
  )
}

export default DisplayTechIcons