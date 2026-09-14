import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-[1440px] px-6 py-4 lg:px-12"
        >
            <ol className="flex flex-wrap items-center gap-1 text-[1.05rem] font-medium leading-relaxed">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <React.Fragment key={`${item.label}-${index}`}>
                            {index > 0 && (
                                <li
                                    aria-hidden="true"
                                    className="mx-1 text-brand-primary"
                                >
                                    /
                                </li>
                            )}

                            <li
                                className={
                                    isLast
                                        ? "font-bold text-ink"
                                        : "font-bold text-ink-muted"
                                }
                            >
                                {item.to && !isLast ? (
                                    <Link
                                        to={item.to}
                                        className="transition-colors duration-300 hover:text-brand-primary"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    item.label
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}