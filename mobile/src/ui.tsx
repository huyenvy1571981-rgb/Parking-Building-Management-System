import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./theme";

export function Screen({ children }: { children: React.ReactNode }) { return <SafeAreaView style={s.screen}>{children}</SafeAreaView>; }
export function Field(props: TextInputProps & { label?: string }) { return <View style={s.fieldWrap}>{props.label && <Text style={s.label}>{props.label}</Text>}<TextInput placeholderTextColor="#9AA1B2" {...props} style={[s.field, props.style]} /></View>; }
export function Button({ title, onPress, secondary, danger, disabled, loading }: { title: string; onPress: () => void; secondary?: boolean; danger?: boolean; disabled?: boolean; loading?: boolean }) {
  return <Pressable disabled={disabled || loading} onPress={onPress} style={[s.button, secondary && s.secondary, danger && s.danger, (disabled || loading) && s.disabled]}>{loading ? <ActivityIndicator color={secondary ? colors.primary : "white"} /> : <Text style={[s.buttonText, secondary && s.secondaryText]}>{title}</Text>}</Pressable>;
}
export function Card({ children }: { children: React.ReactNode }) { return <View style={s.card}>{children}</View>; }
export function Empty({ text }: { text: string }) { return <View style={s.empty}><Text style={s.emptyIcon}>🅿️</Text><Text style={s.muted}>{text}</Text></View>; }
export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, gap: 14 },
  title: { fontSize: 28, fontWeight: "800", color: colors.text }, subtitle: { fontSize: 15, lineHeight: 22, color: colors.muted },
  fieldWrap: { gap: 7 }, label: { fontSize: 14, fontWeight: "700", color: colors.text },
  field: { height: 52, borderWidth: 1, borderColor: colors.border, backgroundColor: "white", borderRadius: 14, paddingHorizontal: 16, fontSize: 16, color: colors.text },
  button: { minHeight: 52, borderRadius: 14, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  secondary: { backgroundColor: "white", borderWidth: 1, borderColor: colors.primary }, danger: { backgroundColor: colors.danger }, disabled: { opacity: .5 },
  buttonText: { color: "white", fontWeight: "800", fontSize: 16 }, secondaryText: { color: colors.primary },
  card: { backgroundColor: "white", padding: 16, borderRadius: 18, borderWidth: 1, borderColor: colors.border, gap: 8 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  muted: { color: colors.muted, lineHeight: 20 }, value: { color: colors.text, fontWeight: "700" },
  badge: { alignSelf: "flex-start", borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#E9F9F3" },
  badgeText: { color: colors.success, fontWeight: "700", fontSize: 12 }, empty: { alignItems: "center", padding: 40, gap: 10 }, emptyIcon: { fontSize: 38 },
});
