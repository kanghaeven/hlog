//라우팅 관련 타입

// params는 Promise 객체로 감싸져 있어, 파라미터를 비동기적으로 반환
export type CategoryParams = {
  params: Promise<{ categorySlug: string }>;
};

// params는 Promise 객체로 감싸져 있어, 두 파라미터를 비동기적으로 반환
export type PostParams = {
  params: Promise<{ categorySlug: string; postSlug: string }>;
};
