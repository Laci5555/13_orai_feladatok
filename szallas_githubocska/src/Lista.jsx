import React from 'react'

export default function Lista({foglalasok}) {
  return (
    <div className='lista doboz' data-testid="szulo">
        {foglalasok.map(x => <div className='sor'>{x.ejszaka} éjszaka (x 15000,-Ft) {x.reggeli?"+ reggeli ("+x.ejszaka+" x 5000,-Ft)" : ""} = összessen {x.reggeli? x.ejszaka*15000+x.ejszaka*5000 : x.ejszaka*15000},-Ft</div>)}
    </div>
  )
}
