"use client";

import { useEffect, useMemo, useState } from "react";
import { Bike, CarFront, LoaderCircle, Save, Tags } from "lucide-react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";
import { authFetch } from "@/lib/api";

type VehicleType = {
  VehicleTypeID: number;
  VehicleTypeName: string;
  Width: number | string;
  Height: number | string;
  HourlyPrice: number | string;
  DailyPrice: number | string;
  Description: string;
};

type PriceDraft = {
  hourlyPrice: string;
  dailyPrice: string;
};

const money = new Intl.NumberFormat("vi-VN");

function vehicleIcon(name: string) {
  const normalized = name.toLocaleLowerCase("vi");
  return normalized.includes("máy") || normalized.includes("motor") ? Bike : CarFront;
}

export default function PricingPage() {
  const [items, setItems] = useState<VehicleType[]>([]);
  const [drafts, setDrafts] = useState<Record<number, PriceDraft>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    authFetch<VehicleType[]>("/vehicle-types")
      .then((data) => {
        if (!active) return;
        setItems(data);
        setDrafts(
          Object.fromEntries(
            data.map((item) => [
              item.VehicleTypeID,
              {
                hourlyPrice: String(item.HourlyPrice ?? 0),
                dailyPrice: String(item.DailyPrice ?? 0),
              },
            ])
          )
        );
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : "Không thể tải bảng giá.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const hasInvalidPrice = useMemo(
    () =>
      items.some((item) => {
        const draft = drafts[item.VehicleTypeID];
        return (
          !draft ||
          draft.hourlyPrice.trim() === "" ||
          draft.dailyPrice.trim() === "" ||
          Number(draft.hourlyPrice) < 0 ||
          Number(draft.dailyPrice) < 0 ||
          !Number.isFinite(Number(draft.hourlyPrice)) ||
          !Number.isFinite(Number(draft.dailyPrice))
        );
      }),
    [drafts, items]
  );

  const changePrice = (id: number, field: keyof PriceDraft, value: string) => {
    setMessage("");
    setError("");
    setDrafts((current) => ({
      ...current,
      [id]: { ...current[id], [field]: value },
    }));
  };

  const savePrices = async () => {
    if (hasInvalidPrice) {
      setError("Giá phải là số hợp lệ và không được nhỏ hơn 0.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const updated = await Promise.all(
        items.map((item) => {
          const draft = drafts[item.VehicleTypeID];
          return authFetch<VehicleType>(`/vehicle-types/${item.VehicleTypeID}`, {
            method: "PUT",
            body: JSON.stringify({
              VehicleTypeName: item.VehicleTypeName,
              Width: Number(item.Width),
              Height: Number(item.Height),
              HourlyPrice: Number(draft.hourlyPrice),
              DailyPrice: Number(draft.dailyPrice),
              Description: item.Description ?? "",
            }),
          });
        })
      );
      setItems(updated);
      setMessage("Đã lưu bảng giá vào hệ thống.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể lưu bảng giá.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-[#111827]">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 pb-12 lg:px-8">
        <Header />

        <section className="mx-auto mt-8 max-w-6xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#6D5DF6]">
                <Tags size={17} /> Cấu hình dịch vụ
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Quản lý bảng giá</h1>
              <p className="mt-2 text-sm text-[#6B7280]">
                Giá được lưu trực tiếp vào database và áp dụng cho ứng dụng tài xế.
              </p>
            </div>

            <button
              onClick={savePrices}
              disabled={loading || saving || !items.length || hasInvalidPrice}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6D5DF6] px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#5b4ae8] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {saving ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
              {saving ? "Đang lưu..." : "Lưu bảng giá"}
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}
          {message && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {message}
            </div>
          )}

          <div className="mt-7 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-7">
            {loading ? (
              <div className="flex min-h-56 items-center justify-center gap-3 text-sm text-[#6B7280]">
                <LoaderCircle className="animate-spin text-[#6D5DF6]" size={22} />
                Đang tải bảng giá...
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center text-sm text-[#6B7280]">
                Chưa có loại phương tiện để thiết lập giá.
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {items.map((item) => {
                  const Icon = vehicleIcon(item.VehicleTypeName);
                  const draft = drafts[item.VehicleTypeID];
                  const monthlyEstimate = Number(draft?.dailyPrice || 0) * 20;

                  return (
                    <article
                      key={item.VehicleTypeID}
                      className="rounded-2xl border border-[#E5E7EB] bg-white p-5 transition duration-200 hover:border-[#d9d4ff] hover:shadow-md sm:p-6"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0eeff] text-[#6D5DF6]">
                          <Icon size={22} />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">Loại xe</p>
                          <h2 className="mt-0.5 text-lg font-bold">{item.VehicleTypeName}</h2>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="text-sm font-semibold">Giá mỗi giờ</span>
                          <div className="relative mt-2">
                            <input
                              type="number"
                              min="0"
                              step="1000"
                              value={draft?.hourlyPrice ?? ""}
                              onChange={(event) => changePrice(item.VehicleTypeID, "hourlyPrice", event.target.value)}
                              className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 pr-12 text-base font-semibold outline-none transition focus:border-[#6D5DF6] focus:bg-white focus:ring-4 focus:ring-[#6D5DF6]/10"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">đ</span>
                          </div>
                        </label>

                        <label className="block">
                          <span className="text-sm font-semibold">Giá mỗi ngày</span>
                          <div className="relative mt-2">
                            <input
                              type="number"
                              min="0"
                              step="1000"
                              value={draft?.dailyPrice ?? ""}
                              onChange={(event) => changePrice(item.VehicleTypeID, "dailyPrice", event.target.value)}
                              className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 pr-12 text-base font-semibold outline-none transition focus:border-[#6D5DF6] focus:bg-white focus:ring-4 focus:ring-[#6D5DF6]/10"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">đ</span>
                          </div>
                        </label>
                      </div>

                      <div className="mt-5 flex items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-3">
                        <div>
                          <p className="text-xs text-[#6B7280]">Vé tháng dự kiến</p>
                          <p className="mt-1 text-sm font-bold">{money.format(monthlyEstimate)}đ / tháng</p>
                        </div>
                        <span className="rounded-lg bg-white px-3 py-1.5 text-xs text-[#6B7280] shadow-sm">
                          Giá ngày × 20
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <p className="mt-4 text-xs leading-5 text-[#6B7280]">
            Giá theo giờ được dùng để tính phí gửi xe và phí đặt chỗ. Giá theo ngày được dùng để tính vé tháng.
          </p>
        </section>
      </main>
    </div>
  );
}
