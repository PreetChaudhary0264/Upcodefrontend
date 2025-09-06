import { useEffect, useState } from "react"
import { RiStarSFill, RiStarSLine, RiStarHalfSLine } from "react-icons/ri"

function RatingStars({ Review_Count, Star_Size }) {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    const wholeStars = Math.floor(Review_Count) || 0
    setStarCount({
      full: wholeStars,
      half: Number.isInteger(Review_Count) ? 0 : 1,
      empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
    })
  }, [Review_Count])

  return (
    <div className="flex gap-1 text-yellow-400">
      {[...new Array(starCount.full)].map((_, i) => (
        <RiStarSFill key={`full-${i}`} size={Star_Size || 20} />
      ))}

      {[...new Array(starCount.half)].map((_, i) => (
        <RiStarHalfSLine key={`half-${i}`} size={Star_Size || 20} />
      ))}

      {[...new Array(starCount.empty)].map((_, i) => (
        <RiStarSLine key={`empty-${i}`} size={Star_Size || 20} />
      ))}
    </div>
  )
}

export default RatingStars
