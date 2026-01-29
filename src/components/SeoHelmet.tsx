import React from "react";

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";


const SeoHelmet = () => {
    const { pathname } = useLocation();

    // pathname에 따른 OG 태그 설정
    const getOgTags = () => {
        // 기본 OG 태그
        const defaultOgTags = {
            title: "KOKKOK Event",
            description: "KOKKOK 이벤트에 참여하세요",
            type: "website",
            url: `${window.location.origin}${pathname}`,
            image: `${window.location.origin}/og/default.png`,
            siteName: "KOKKOK",
        };

        // pathname에 따른 조건부 처리
        if (pathname.includes("/a")) {
            return {
                ...defaultOgTags,
                title: "출석체크 이벤트 - KOKKOK Event",
                description: "매일 출석체크하고 보상을 받으세요",
                image: `${window.location.origin}/a.png`,
            };
        }

        if (pathname.includes("/b")) {
            return {
                ...defaultOgTags,
                title: "초대 리워드 - KOKKOK Event",
                description: "친구를 초대하고 리워드를 받으세요",
                image: `${window.location.origin}/b.png`,
            };

        }

        if (pathname.includes("/c")) {
            return {
                ...defaultOgTags,
                title: "룰렛 이벤트 - KOKKOK Event",
                description: "룰렛을 돌리고 다양한 상품을 받아가세요",
                image: `${window.location.origin}/c.png`,
            };
        }

        return defaultOgTags;
    };

    const ogTags = getOgTags();

    return (
        <Helmet>
            <title>{ogTags.title}</title>
            <meta key="og:title" content={ogTags.title} property="og:title" />
            <meta
                key="og:description"
                content={ogTags.description}
                property="og:description"
            />
            <meta key="og:type" content={ogTags.type} property="og:type" />
            <meta key="og:url" content={ogTags.url} property="og:url" />
            <meta key="og:image" content={ogTags.image} property="og:image" />
            <meta
                key="og:site_name"
                content={ogTags.siteName}
                property="og:site_name"
            />
            <link href={ogTags.url} rel="canonical" />
        </Helmet>
    );
};

export default SeoHelmet;
