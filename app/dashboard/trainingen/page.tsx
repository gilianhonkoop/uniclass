"use client";

import SearchTraining from "@/components/search/SearchTraining";
import AddTraining from "@/components/modals/AddTraining";
import TrainingTable from "@/components/tables/TrainingTable";
import { useState, useEffect } from "react";
import {
  getStudies,
  getVakken,
  getUniversiteiten,
  getAllLessen,
  getSpecificTrainingen,
} from "@/utils/functions/search";
import ShowDeleted from "@/components/search/ShowDeleted";
import ShowExpired from "@/components/search/ShowExpired";

export default function Page() {
  const [showExpired, setShowExpired] = useState("expired");
  const [showDeleted, setShowDeleted] = useState("deleted");
  const [uniId, setUniId] = useState(-1);
  const [studieId, setStudieId] = useState(-1);
  const [vakId, setVakId] = useState(-1);
  const [trainingen, setTrainingen] = useState<any>([]);
  const [lessen, setLessen] = useState<any>([]);
  const [universiteiten, setUniversiteiten] = useState<any>([]);
  const [studies, setStudies] = useState<any>([]);
  const [vakken, setVakken] = useState<any>([]);

  useEffect(() => {
    getUniversiteiten().then((unis) => {
      setUniversiteiten(unis);
    });
  }, []);

  useEffect(() => {
    if (uniId != -1) {
      getStudies(uniId).then((studies) => {
        setStudies(studies);
      });
    }
  }, [uniId]);

  useEffect(() => {
    if (studieId != -1) {
      getVakken(studieId).then((vakken) => {
        setVakken(vakken);
      });
    }
  }, [studieId]);

  useEffect(() => {
    async function Les() {
      let lessen = await getAllLessen();
      setLessen(lessen);
    }

    Les();
  }, []);

  useEffect(() => {
    async function Train() {
      let trainings = await getSpecificTrainingen(
        uniId,
        studieId,
        vakId,
        showExpired,
        showDeleted,
      );
      setTrainingen(trainings);
    }

    if (uniId != -1) {
      Train();
    }
  }, [uniId, studieId, vakId, showExpired, showDeleted]);

  return (
    <>
      <div className="h-screen">
        <div className="h-[6rem] flex flex-row items-center gap-10 px-10 justify-evenly">
          <SearchTraining
            universiteiten={universiteiten}
            studies={studies}
            vakken={vakken}
            uniId={uniId}
            studieId={studieId}
            setUniId={setUniId}
            setStudieId={setStudieId}
            setVakId={setVakId}
          />
          <div className="h-fit">
            <AddTraining uni_id={uniId} studie_id={studieId} vak_id={vakId} />
          </div>
        </div>
        <div className="flex my-[1rem] px-10 gap-10 justify-center">
          <ShowExpired
            showExpired={showExpired}
            setShowExpired={setShowExpired}
          />
          <ShowDeleted
            showDeleted={showDeleted}
            setShowDeleted={setShowDeleted}
          />
        </div>
        <div className="w-full h-full py-5 px-8 flex flex-col">
          <TrainingTable trainingen={trainingen} lessen={lessen} />
        </div>
      </div>
    </>
  );
}
