import { Card} from 'react-bootstrap'
import { useState } from 'react'

function GenericList({ title, data, renderSummary, renderDetails }) {
  const [openItems, setOpenItems] = useState({})

  const toggleOpen = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div style={{ direction: 'rtl', padding: '20px' }}>
      <h2>{title}</h2>
      {data.length === 0 ? (
        <p>no data to display</p>
      ) : (
        data.map((item) => (
          <Card key={item._id} className="mb-3 p-3 shadow-sm">
            <div
              onClick={() => toggleOpen(item._id)}
              style={{ cursor: 'pointer' }}
            >
              {renderSummary(item)}
            </div>

            {openItems[item._id] && (
              <div className="mt-3">{renderDetails(item)}</div>
            )}
          </Card>
        ))
      )}
    </div>
  )
}

export default GenericList
