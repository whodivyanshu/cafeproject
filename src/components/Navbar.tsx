import { CiSearch } from 'react-icons/ci'
import { PiCookingPotBold } from 'react-icons/pi'
import { TbChecklist } from 'react-icons/tb'

const Navbar = ({showSearch, showCart}: {
  showSearch: boolean;
  showCart: boolean;
}) => {
  return (
    <div className="flex justify-around p-2 py-5 h-20  fixed w-full z-10 bg-[#f1f1f1]">
      {showCart && (

        <div>
        <p className="flex  items-center gap-1 mt-1">
          <TbChecklist size={25} /> Bill{' '}
        </p>
      </div>
      )}
      <div>
        <p className="flex items-center gap-2 font-bold">
          <PiCookingPotBold size={35} /> Restaurant
        </p>
      </div>
      {showSearch && (

        <div className="items-center flex">
        <CiSearch size={25} />
      </div>
      )}
    </div>
  )
}

export default Navbar
