import {Link} from 'react-router-dom'
import '../../main.scss'
import HelperImage from '../../images/helperImage.webp'

const HomePage = () => {
  return (
    <>
        <div className='homescreenTopDiv'>
            <h1>Bankan</h1>
            <Link to='/boards'>
            <button>Create board</button>
            </Link>
        </div>
        <div className='homescreenBottomDiv'>
            <div className='helperText'>
            <h2>Bankan helps teams move work forward.</h2>
            <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Bankan.</p>
            </div>
            <div className='helperImage'><img src={HelperImage} alt="" /></div>
        </div>
    </>
  )
}

export default HomePage








