import {textArrayGenerator} from '../../utils/generateRandomText'
import Footer from '../elements/Footer'
import './About.css'
import ProtectedRoute from '../elements/ProtectedRoute'

const About = () => {
  const arrText: string[] = textArrayGenerator(30)

  return (
    <ProtectedRoute>
      <div className="img-background__blur">
        <div className="class-container">
          <main>
            <div className=" about-container">
              <h1>About</h1>
              <>
                {arrText.map((elem, id) => (
                  <p className="text" key={id}>
                    {elem}
                  </p>
                ))}
              </>
            </div>
          </main>
          <footer className="class-footer">
            <Footer />
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default About
