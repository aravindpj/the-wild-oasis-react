import { formatCurrency } from "../../utils/helpers"
import Stat from "./Stat"
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from 'react-icons/hi2'
function Stats({bookings,confirmedStays,numDays,cabinCount}) {

    const numBookings=bookings.length
    const sales=bookings.reduce((acu,cur)=>acu+cur.totalPrice,0)
    const checkins=confirmedStays.length
    const occupation=confirmedStays.reduce((acu,cur)=>acu+cur.numNights,0) / (numDays * cabinCount)
    return (
        <>
            <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase/>} value={numBookings}/>
            <Stat title="Sales" color="green" icon={<HiOutlineBanknotes/>} value={formatCurrency(sales)}/>
            <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays/>} value={checkins}/>
            <Stat title="Occupency rate" color="yellow" icon={<HiOutlineChartBar/>} value={Math.round(occupation * 100)+ "%"}/>
        </>
    )
}

export default Stats
