import { useRouter } from 'next/router'

const Movie = () => {
  const router = useRouter()
  const { slug, type } = router.query

  return (
    <div className='text-white'>
      <h1>{slug}</h1>
      <p>This is the content of the Movie with the slug {slug}</p>
      <p>This is the content of the Movie with the slug {type}</p>

    </div>
  )
}

export default Movie