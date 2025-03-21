import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// 클래스 이름을 동적으로 결합하고, 중복된 Tailwind CSS 클래스를 병합하는 유틸리티 함수
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
