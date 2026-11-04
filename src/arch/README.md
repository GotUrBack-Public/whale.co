# Architecture

`src/app` handles routing and page composition. `src/features` owns business features and their UI/model/data boundaries. `src/entities` will contain shared domain entities. `src/shared` will contain reusable UI and utilities. `src/arch` documents cross-cutting decisions and integration boundaries.

Never trust client-side wallet balance or membership state for authorization. Verify wallet signatures, holdings, and eligibility server-side before granting access.
