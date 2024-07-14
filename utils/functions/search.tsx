import { createClient } from "@/utils/supabase/server";

export async function getUniversiteiten() {
  "use server";

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
