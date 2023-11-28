
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import dayjs from 'dayjs'
import { useCallback, useMemo, useState } from 'react';

import moment from 'moment'

const localizer = momentLocalizer(moment)

function Scheduler() {
    // const [ events, setEvents ] = useState<any[]>([])

   
    return (
      <div className="scheduler">

      </div>
    );
  }
  
  export default Scheduler;