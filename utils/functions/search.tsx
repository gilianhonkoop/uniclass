"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAllLessen() {
  const supabase = createClient();
  const { data, error } = await supabase.from("lessen").select();

  if (data == null) {
    return [];
  }

  return data;
}

export async function getUniversiteiten() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("universiteiten")
    .select()
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

export async function getStudies(id: number | string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("studies")
    .select()
    .eq("universiteit_id", id)
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

export async function getVakken(id: number | string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vakken")
    .select()
    .eq("studie_id", id)
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

export async function getTrainingen(id: number | string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("trainingen")
    .select()
    .eq("vak_id", id)
    .eq("status", "active")
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

export async function getLessen(ids: string[]) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessen")
    .select()
    .in("id", ids)
    .order("begin", { ascending: true });

  if (data == null) {
    return [];
  }

  return data;
}

export async function getLokaal(id: string | number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lokalen")
    .select("naam")
    .eq("id", id);

  if (data == null) {
    return [];
  }

  return data;
}

export async function getSpecificTrainingen(
  uniId: number | undefined,
  studieId: number | undefined,
  vakId: number | undefined,
  getExpired: string,
  getDeleted: string,
) {
  "use server";
  const supabase = createClient();

  if (uniId != -1 && studieId != -1 && vakId != -1) {
    const { data, error } = await supabase
      .from("trainingen")
      .select()
      .eq("universiteit_id", uniId)
      .eq("studie_id", studieId)
      .eq("vak_id", vakId)
      .neq("status", getExpired)
      .neq("status", getDeleted)
      .order("id", { ascending: false });

    return data;
  }

  if (uniId != -1 && studieId != -1) {
    const { data, error } = await supabase
      .from("trainingen")
      .select()
      .eq("universiteit_id", uniId)
      .neq("status", getExpired)
      .neq("status", getDeleted)
      .eq("studie_id", studieId)
      .order("id", { ascending: false });

    return data;
  }

  if (uniId != -1) {
    const { data, error } = await supabase
      .from("trainingen")
      .select()
      .neq("status", getExpired)
      .neq("status", getDeleted)
      .eq("universiteit_id", uniId)
      .order("id", { ascending: false });

    return data;
  }

  if (uniId == -1) {
    const { data, error } = await supabase
      .from("trainingen")
      .select()
      .neq("status", getExpired)
      .neq("status", getDeleted)
      .order("id", { ascending: false });

    return data;
  }

  return [];
}

export async function getUniName(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("universiteiten")
    .select("naam")
    .eq("id", id);

  if (data == null) {
    return "";
  }

  return data[0].naam;
}

export async function getStudieName(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("studies")
    .select("naam")
    .eq("id", id);

  if (data == null) {
    return "";
  }

  return data[0].naam;
}

export async function getVakName(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vakken")
    .select("naam")
    .eq("id", id);

  if (data == null) {
    return "";
  }

  return data[0].naam;
}
