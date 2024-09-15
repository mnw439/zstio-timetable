import { TableLesson } from "@majusss/timetable-parser";
import { LinkWithCookie } from "../link";

export const TableLessonCell: React.FC<{
  day: TableLesson[][];
  lessonIndex: number;
}> = ({ day, lessonIndex }) => (
  <td className="px-4 py-3 last:border-0">
    {day[lessonIndex]?.map((lesson, index) => (
      <LessonItem key={index} lesson={lesson} />
    ))}
  </td>
);

const LessonItem: React.FC<{ lesson: TableLesson }> = ({ lesson }) => {
  return (
    <div className="flex w-full items-center justify-between gap-x-4">
      <h2 className="whitespace-nowrap text-base font-semibold text-primary/90">
        {lesson.subject}
        {lesson.groupName && (
          <span className="text-sm font-medium text-primary/70">
            {" "}
            ({lesson.groupName})
          </span>
        )}
      </h2>
      <div className="inline-flex gap-x-1.5 text-sm font-medium text-primary/70">
        <LessonLink id={lesson.classId} name={lesson.className} type="class" />
        <LessonLink
          id={lesson.teacherId}
          name={lesson.teacher}
          type="teacher"
        />
        <LessonLink id={lesson.roomId} name={lesson.room} type="room" />
      </div>
    </div>
  );
};

const LessonLink: React.FC<{ id?: string; name?: string; type: string }> = ({
  id,
  name,
  type,
}) => {
  const link = `/${type}/${id}`;

  return id && name ? (
    <LinkWithCookie
      aria-label={`Przejdź do ${link}`}
      className="hover:underline"
      href={link}
    >
      {name}
    </LinkWithCookie>
  ) : null;
};
