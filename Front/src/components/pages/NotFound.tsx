import './NotFound.css'
import Footer from '../elements/Footer'
import ProtectedRoute from '../elements/ProtectedRoute'

const NotFound = () => {
  return (
    <ProtectedRoute>
      <div className="img-background__blur">
        <div className="class-container">
          <main className="notFound-container">
            <h1>Not Found</h1>
          </main>
          <footer className="class-footer">
            <Footer />
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default NotFound
