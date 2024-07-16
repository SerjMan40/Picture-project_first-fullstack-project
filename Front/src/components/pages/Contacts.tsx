import './Contacts.css'
import Footer from '../elements/Footer'
import ProtectedRoute from '../elements/ProtectedRoute'

const Contacts = () => {
  return (
    <ProtectedRoute>
      <div className="img-background__blur">
        <div className="class-container">
          <main>
            <div className="contacts-container">
              <div className="info">
                <h1>Contact Us</h1>
                <p>For any inquiries, please contact us at:</p>
                <ul>
                  <li>Email: example@example.com</li>
                  <li>Phone: 123-456-7890</li>
                  <li>Address: 123 Main Street, City, Country</li>
                </ul>
              </div>
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

export default Contacts
