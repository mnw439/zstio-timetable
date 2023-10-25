"use client";

import RenderLesson from "./RenderLesson";
import shortHours from "./../../utils/shortHours";
import { getCurrentLesson } from "@/utils/currentLesson";

export default function RenderTableRow({
  hours,
  isShortHours,
  lessons,
  substitutions,
}) {
  const maxLessons =
    typeof hours == "object" &&
    Math.max(Object.entries(hours).length, ...lessons.map((day) => day.length));
  return (
    <tbody>
      {Object.entries(hours).length > 1 ? (
        Object.entries(
          isShortHours ? shortHours.slice(0, maxLessons) : hours
        )?.map(([key, hour], index) => {
          const { number, timeFrom, timeTo } = hour;
          let { isWithinTimeRange, minutesRemaining } = getCurrentLesson(
            timeFrom,
            timeTo
          );

          return (
            <tr
              className={`text-gray-600 dark:text-gray-300 border-b ${
                index % 2 === 0
                  ? "bg-white dark:bg-[#191919]"
                  : "bg-gray-50 dark:bg-[#202020]"
              } dark:border-[#181818] `}
              key={index}
            >
              <td
                className={`py-4 text-center h-full border-r last:border-none font-semibold dark:border-[#171717]`}
              >
                <div className="flex justify-center items-center flex-col">
                  {number}
                  {isWithinTimeRange && minutesRemaining > 0 && (
                    <div className="bg-blue-100 mt-1 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-100 dark:text-red-800 border border-blue-400 dark:border-red-400">
                      <p>{minutesRemaining == 1 ? "ZOSTAŁA" : "ZOSTAŁO"}</p>
                      <p>{`${minutesRemaining} MIN`}</p>
                    </div>
                  )}
                </div>
              </td>
              <td className="text-center border-r dark:border-[#171717]">
                {timeFrom} - {timeTo}
              </td>

              {lessons?.map((day, lessonIndex) => (
                <td
                  className={`px-6 py-4 whitespace-nowrap border-r last:border-none dark:border-[#171717]`}
                  key={`${day}-${lessonIndex}`}
                >
                  <RenderLesson
                    number={number}
                    index={index}
                    lessonIndex={lessonIndex}
                    day={day}
                    substitutions={substitutions}
                  />
                </td>
              ))}
            </tr>
          );
        })
      ) : (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-all">
          <td
            scope="row"
            colSpan={7}
            className="px-6 py-4 font-semibold text-center text-gray-900 whitespace-nowrap dark:text-white transition-all"
          >
            Nie znaleziono żadnych lekcji
          </td>
        </tr>
      )}
    </tbody>
  );
}