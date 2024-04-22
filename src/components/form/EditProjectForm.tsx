import Form from '@/components/form/Form';
import { Post } from '@/interface/project';
import Link from 'next/link';
import EditFrom from './FormEdit';

interface EditProjectFormProps {
  project: Post
}


function EditProjectForm({ project }: EditProjectFormProps) {
  return (
    <div >
      <h1 className='text-5xl font-black'>
        Editar Proyecto {project.title}
      </h1>
      <p className='text-2xl font-light text-gray-300 mt-5'>
       Llena el siguiente formulario para editar el proyecto
      </p>
      <nav className='my-6'>

        <Link href='/dashboard' className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-xl'>Volver a Proyectos
        </Link>
      </nav>
      <EditFrom project={project}/>
    </div>
  )
}

export default EditProjectForm