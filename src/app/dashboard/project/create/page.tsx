import Link from 'next/link';
import Forms from '@/components/form/Form';


function ProjectPage() {
  return (
    <div>
      <h1 className='text-5xl font-black'>
        Crear Proyecto
      </h1>
      <p className='text-2xl font-light text-gray-300 mt-5'>
       Llena el siguiente formulario para crear un nuevo proyecto
      </p>
      <nav className='my-6'>

        <Link href='/dashboard' className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-xl'>Volver a Proyectos
        </Link>
      </nav>
      <Forms />
    </div>
  )
}

export default ProjectPage