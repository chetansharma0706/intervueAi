import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "../../../utils/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const formattedDate = dayjs(createdAt || Date.now()).format("MMMM D, YYYY");
  const feedback = null as Feedback | null;
  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96 mb-4">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 px-4 py-2 rounded-bl-lg bg-[#155E75]">
            <p className="badge-text">{type}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="interview-cover"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalize">{role} Interview</h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={20}
                height={20}
                className="object-fit"
              />
              <p className="text-gray-400">{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/star.svg"
                alt="star"
                width={22}
                height={22}
                className="object-fit"
              />
              <p className="text-gray-400">{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || "You Haven't given the Interview yet. Take it now to Improve your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
            <DisplayTechIcons techStack={techstack} />
           <Button className="btn-primary">
                <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>
                {feedback ? "View Feedback" : "Take Interview"}
                </Link>

                </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
