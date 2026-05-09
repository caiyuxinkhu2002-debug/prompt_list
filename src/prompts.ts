/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PromptItem {
  id: string;
  role: string;
  type: string;
  content_ko: string;
  content_en: string;
}

export interface Category {
  id: string;
  name_ko: string;
  name_en: string;
  prompts: PromptItem[];
}

export const PROMPT_DATA: Category[] = [
  {
    id: "cat-1",
    name_ko: "보고서 / 기획서",
    name_en: "Reports / Planning",
    prompts: [
      {
        id: "001",
        role: "기획자",
        type: "구조화",
        content_ko: "[신규 서비스 기획]에 대한 아이데이션 회의록 내용을 바탕으로, 경영진 보고용 '원페이지 기획서' 초안을 작성해주세요. 핵심 문제 정의, 해결 방안, 기대 효과, 소요 예산 항목을 포함하여 개조식으로 명료하게 정리해주세요.",
        content_en: "Based on the ideation meeting minutes for [New Service Planning], please write a draft of a 'One-Page Proposal' for management reporting. Clearly organize it in a point-form style, including key problem definitions, solutions, expected effects, and budget requirements."
      },
      {
        id: "002",
        role: "CEO/임원",
        type: "요약/정리",
        content_ko: "첨부된 50페이지 분량의 [분기별 실적 보고서] 내용을 요약하여, 핵심 성과 지표(KPI) 달성 현황과 주요 이슈사항만 파악할 수 있도록 3분 브리핑용 스크립트로 변환해주세요.",
        content_en: "Summarize the attached 50-page [Quarterly Performance Report] and convert it into a 3-minute briefing script so that only the status of key performance indicators (KPIs) and major issues can be identified."
      },
      {
        id: "003",
        role: "기획자",
        type: "문서생성",
        content_ko: "[ESG 경영 도입]을 위한 태스크포스(TF) 운영 계획서를 작성해주세요. 추진 배경, TF 조직 구성안(R&R 포함), 단계별 마일스톤(3개월 단위), 예상 리스크 및 대응 방안을 포함한 목차를 먼저 제안해주세요.",
        content_en: "Please prepare an operation plan for the task force (TF) for [Introduction of ESG Management]. First, propose a table of contents including the background of the promotion, TF organization plan (including R&R), step-by-step milestones (every 3 months), and expected risks and countermeasures."
      }
    ]
  },
  {
    id: "cat-2",
    name_ko: "마케팅 / 콘텐츠",
    name_en: "Marketing / Content",
    prompts: [
      {
        id: "011",
        role: "마케터",
        type: "문서생성",
        content_ko: "[2030 직장인 여성]을 타겟으로 한 [건강기능식품] 인스타그램 카드뉴스 5장 분량의 기획안을 작성해주세요. 각 장별 들어갈 카피(헤드라인/바디)와 추천 이미지 컨셉을 표로 정리해주세요.",
        content_en: "Create a 5-page planning proposal for an Instagram card news for [Health Functional Food] targeting [Working women in their 20s and 30s]. Summarize the copy (headline/body) for each page and the recommended image concept in a table."
      },
      {
        id: "012",
        role: "콘텐츠작가",
        type: "문서생성",
        content_ko: "[SaaS 협업 툴]의 신기능 출시를 알리는 블로그 포스팅 초안을 작성해주세요. '업무 효율', '비대면 협업', '프로젝트 관리'를 자연스럽게 포함하고, '문제제기-해결책-기능소개-CTA' 구조로 작성해주세요.",
        content_en: "Write a draft blog post announcing the launch of new features for [SaaS Collaboration Tool]. Naturally include 'work efficiency', 'non-face-to-face collaboration', and 'project management', and write in a structure of 'problem raising-solution-feature introduction-CTA'."
      }
    ]
  },
  {
    id: "cat-3",
    name_ko: "교육 / 강의자료",
    name_en: "Education / Lecture",
    prompts: [
      {
        id: "021",
        role: "강사",
        type: "구조화",
        content_ko: "[신입사원 비즈니스 매너] 교육을 위한 4시간짜리 워크숍 커리큘럼을 상세하게 짜주세요. 시간대별 모듈, 주요 학습 내용, 활용할 수 있는 아이스브레이킹 게임을 포함해주세요.",
        content_en: "Please develop a detailed 4-hour workshop curriculum for [New Employee Business Etiquette] training. Include hourly modules, key learning contents, and ice-breaking games that can be used."
      }
    ]
  },
  {
    id: "cat-4",
    name_ko: "HR / 인사",
    name_en: "HR",
    prompts: [
      {
        id: "031",
        role: "HR담당자",
        type: "문서생성",
        content_ko: "[시니어 개발자] 채용 공고(JD)를 작성해주세요. 기술 스택 나열보다는 우리 회사의 개발 문화, 자율성, 성장 기회를 매력적으로 어필하는 '채용 브랜딩' 관점에서 작성해주세요.",
        content_en: "Write a job description (JD) for [Senior Developer]. Write from the perspective of 'recruitment branding' that attractively appeals to our company's development culture, autonomy, and growth opportunities rather than listing technology stacks."
      }
    ]
  },
  {
    id: "cat-5",
    name_ko: "제안서 / 영업",
    name_en: "Proposal / Sales",
    prompts: [
      {
        id: "041",
        role: "영업/BD",
        type: "문서생성",
        content_ko: "잠재 고객사([유통 대기업]) 담당자에게 보낼 [콜드 메일] 초안을 작성해주세요. 우리 솔루션이 그들의 '물류 비용 절감' 문제를 어떻게 해결해줄 수 있는지 짧고 강렬하게 제안해주세요.",
        content_en: "Write a draft [Cold Mail] to be sent to the person in charge of a potential client ([Distribution conglomerates]). Briefly and intensely propose how our solution can solve their 'logistics cost reduction' problem."
      }
    ]
  },
  {
    id: "cat-6",
    name_ko: "분석 / 데이터",
    name_en: "Analysis / Data",
    prompts: [
      {
        id: "051",
        role: "데이터분석가",
        type: "분석",
        content_ko: "첨부된 CSV 데이터(매출, 날짜, 지역, 상품군)를 분석하기 위한 Python Pandas 코드를 생성해주세요. 월별 매출 추이 시각화, 지역별 베스트셀러 상품 도출, 전월 대비 성장률 계산 코드를 포함해주세요.",
        content_en: "Generate Python Pandas code for analyzing the attached CSV data (sales, date, region, product group). Include code for visualizing monthly sales trends, deriving best-selling products by region, and calculating growth rates compared to the previous month."
      }
    ]
  },
  {
    id: "cat-7",
    name_ko: "법무 / 계약",
    name_en: "Legal / Contracts",
    prompts: [
      {
        id: "061",
        role: "법무/행정",
        type: "문서생성",
        content_ko: "[비밀유지계약서(NDA)] 표준 양식을 작성해주세요. 정의, 비밀정보의 범위, 예외 사항, 비밀유지 의무 기간(3년), 위반 시 손해배상 조항을 포함하여 법적으로 꼼꼼한 초안을 만들어주세요.",
        content_en: "Please draft a standard [Non-Disclosure Agreement (NDA)] form. Create a legally meticulous draft including definitions, scope of confidential information, exceptions, period of non-disclosure obligation (3 years), and compensation for damages in case of violation."
      }
    ]
  },
  {
    id: "cat-8",
    name_ko: "IT / 개발",
    name_en: "IT / Dev",
    prompts: [
      {
        id: "071",
        role: "개발자",
        type: "문서생성",
        content_ko: "작성한 코드(Python)에 대한 [API 문서(Swagger 스타일)] 설명을 작성해주세요. 각 엔드포인트의 기능, 요청 파라미터, 응답 예시, 에러 코드를 포함하여 다른 개발자가 보고 연동할 수 있도록 상세히 기술해주세요.",
        content_en: "Please write an [API Documentation (Swagger-style)] description for the written code (Python). Describe in detail so that other developers can see and integrate it, including the function of each endpoint, request parameters, response examples, and error codes."
      }
    ]
  },
  {
    id: "cat-9",
    name_ko: "전략 / 경영",
    name_en: "Strategy / Mgmt",
    prompts: [
      {
        id: "081",
        role: "CEO/임원",
        type: "문서생성",
        content_ko: "신년사(CEO Message)를 작성해주세요. 지난 해의 위기 극복에 대한 감사, 올해의 핵심 경영 키워드('도약', '혁신'), 직원들을 향한 격려와 비전 공유를 담은 감동적이고 힘찬 연설문을 만들어주세요.",
        content_en: "Write a New Year's address (CEO Message). Create a moving and energetic speech containing gratitude for overcoming last year's crisis, this year's key management keywords ('leap', 'innovation'), encouragement for employees, and sharing of vision."
      }
    ]
  },
  {
    id: "cat-10",
    name_ko: "공공 / 행정",
    name_en: "Public / Admin",
    prompts: [
      {
        id: "091",
        role: "공공/행정",
        type: "문서생성",
        content_ko: "[지역 청년 창업 지원 사업] 공모 신청서 초안을 작성해주세요. 사업의 필요성, 추진 목표, 세부 추진 계획, 기대 효과를 정부 공모 양식에 맞는 격식체로 작성해주세요.",
        content_en: "Prepare a draft application form for the [Local Youth Entrepreneurship Support Project]. Write the necessity of the project, promotion goals, detailed promotion plans, and expected effects in a formal style suitable for the government public offering form."
      }
    ]
  }
];
