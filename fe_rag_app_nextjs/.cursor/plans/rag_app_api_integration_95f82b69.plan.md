---
name: RAG App API Integration
overview: 'Wire the Next.js frontend to the FastAPI backend at `http://127.0.0.1:8000` by updating constants, creating typed API utilities, and implementing all four feature areas: document upload page, assets dropdown, dynamic model list, and real chat.'
todos:
  - id: constants
    content: Update utils/constant.ts with new API_BASE_URL and BACKEND_CONFIG endpoints
    status: completed
  - id: types
    content: Create types/api.ts with all OpenAPI-matching TypeScript types
    status: completed
  - id: apiclient
    content: Create utils/apiClient.ts with uploadDocument, listDocuments, listModels, postChat functions
    status: completed
  - id: chatactions
    content: Update actions/chatActions.ts to use POST /api/v1/chat via apiClient
    status: completed
  - id: chatslice
    content: Update store/slices/chatSlice.ts for new ChatResponse shape (answer + sources)
    status: completed
  - id: docsslice
    content: Create store/slices/documentsSlice.ts for selectedDocumentIds and update rootReducer
    status: completed
  - id: modelsection
    content: Update ModelSection to fetch dynamic models from GET /api/v1/models
    status: completed
  - id: assetssection
    content: Create AssetsSection dropdown component using GET /api/v1/documents
    status: completed
  - id: pagelayout
    content: Update app/page.tsx header to add AssetsSection after ModelSection
    status: completed
  - id: chatboxinput
    content: Update ChatBoxInput to read selectedDocumentIds from Redux and pass to chat API
    status: completed
  - id: uploadpage
    content: Create app/documents/page.tsx and UploadSection component for POST/GET/DELETE /api/v1/documents
    status: completed
  - id: sidebar
    content: Add Documents nav link to LeftSideSection
    status: completed
isProject: false
---

# RAG App API Integration Plan

## Backend API Summary (from `http://127.0.0.1:8000/openapi.json`)

- `POST /api/v1/documents` — multipart/form-data `{ file }` → `DocumentResponse`
- `GET /api/v1/documents` — query `?limit&offset` → `Page[DocumentResponse]`
- `DELETE /api/v1/documents/{document_id}` — 204 no content
- `GET /api/v1/models` → `ModelsResponse { models: ModelOption[] }` where `ModelOption = { provider, model, available, detail? }`
- `POST /api/v1/chat` — `{ question, provider?, document_ids? }` → `{ answer, sources: SourceChunk[] }`

---

## Step 1 — Update `utils/constant.ts`

Replace the stale AWS URL and add all endpoint paths:

```typescript
export const API_BASE_URL = `http://127.0.0.1:8000`;
export const API_REVALIDATE_TIME = 300;

export const BACKEND_CONFIG = {
  DOCUMENTS: `/api/v1/documents`,
  MODELS: `/api/v1/models`,
  CHAT: `/api/v1/chat`,
} as const;
```

---

## Step 2 — Create `types/api.ts`

New file with all request/response types mirroring the OpenAPI schema:

- `DocumentStatus`, `DocumentResponse`, `PageDocumentResponse`
- `ModelProvider`, `ModelOption`, `ModelsResponse`
- `ChatRequest`, `SourceChunk`, `ChatResponse`

---

## Step 3 — Create `utils/apiClient.ts`

Thin fetch wrapper using `API_BASE_URL` + `BACKEND_CONFIG`:

- `uploadDocument(file: File): Promise<DocumentResponse>`
- `listDocuments(limit?, offset?): Promise<PageDocumentResponse>`
- `listModels(): Promise<ModelsResponse>`
- `postChat(req: ChatRequest): Promise<ChatResponse>`

---

## Step 4 — Update `actions/chatActions.ts`

Replace the old `http://localhost:5000/ask` call with `postChat()` from apiClient. Map new response `{ answer, sources }` to the shape dispatched to Redux.

---

## Step 5 — Update `store/slices/chatSlice.ts`

Update `ChatMessage` type: replace `summary/provider/model/timestamp` fields with `answer: string` and `sources: SourceChunk[]`.

---

## Step 6 — Add `store/slices/documentsSlice.ts`

New Redux slice to track `selectedDocumentIds: string[]`. Actions: `setSelectedDocumentIds`, `toggleDocumentId`. Update `store/rootReducer.ts` to include it.

---

## Step 7 — Update `ModelSection` (dynamic models from API)

[`components/ChatAreaSection/dependencies/ModelSection/index.tsx`](components/ChatAreaSection/dependencies/ModelSection/index.tsx)

- On mount, call `listModels()` via a `useEffect`
- Replace hardcoded `models` array with API result
- Show only `available: true` models; format label as `"{model} ({provider})"`
- Keep the existing custom dropdown UI/SCSS pattern

---

## Step 8 — Create `AssetsSection` component ("Show Assets" dropdown)

New component mirroring `ModelSection`'s dropdown pattern:

- [`components/ChatAreaSection/dependencies/AssetsSection/index.tsx`](components/ChatAreaSection/dependencies/AssetsSection/index.tsx)
- [`components/ChatAreaSection/dependencies/AssetsSection/AssetsSection.module.scss`](components/ChatAreaSection/dependencies/AssetsSection/AssetsSection.module.scss)
- On open (lazy fetch), calls `listDocuments()`
- Multi-select checkboxes in dropdown; selections update Redux `selectedDocumentIds`
- Button label: "Show Assets" (with count badge when items selected)

---

## Step 9 — Update `app/page.tsx` header

Add `<AssetsSection />` directly after `<ModelSection />` in the header `div.model`:

```1:21:app/page.tsx
<div className={styles.model}>
  <ModelSection />
  <AssetsSection />   {/* ← new */}
</div>
```

---

## Step 10 — Update `ChatBoxInput` to use new chat API

[`components/ChatBoxInput/index.tsx`](components/ChatBoxInput/index.tsx)

- Read `selectedDocumentIds` from Redux store
- Pass `document_ids` to `sendMessage()` action
- Update `onLLMStatusChange`/dispatch to reflect new `ChatResponse` shape (`answer`, `sources`)

---

## Step 11 — Create file upload page

**New files:**

- [`app/documents/page.tsx`](app/documents/page.tsx) — upload page route
- [`components/UploadSection/index.tsx`](components/UploadSection/index.tsx) — upload form component
- [`components/UploadSection/UploadSection.module.scss`](components/UploadSection/UploadSection.module.scss) — styles

**Upload page features:**

- File input (accepts all file types, single file per request)
- On submit: calls `uploadDocument(file)` via a server action or client fetch
- Shows upload status (`processing` / `ready` / `failed`)
- Lists all uploaded documents (calls `listDocuments()`) with delete button (calls `DELETE /api/v1/documents/{id}`)
- Link back to chat (home page)

**Sidebar link:** Add a "Documents" nav item to `LeftSideSection` pointing to `/documents`

---

## Data Flow Diagram

```mermaid
flowchart TD
    subgraph header [Page Header]
        ModelSection -->|"GET /api/v1/models"| modelsAPI["ModelsResponse"]
        AssetsSection -->|"GET /api/v1/documents"| docsAPI["Page[DocumentResponse]"]
        AssetsSection -->|"sets selectedDocumentIds"| Redux
    end

    subgraph chat [Chat Area]
        ChatBoxInput -->|"reads selectedDocumentIds"| Redux
        ChatBoxInput -->|"POST /api/v1/chat {question, provider, document_ids}"| chatAPI["ChatResponse"]
        chatAPI --> Redux
    end

    subgraph docsPage [/documents page]
        UploadSection -->|"POST /api/v1/documents multipart"| uploadAPI["DocumentResponse"]
        UploadSection -->|"GET /api/v1/documents"| docsAPI
        UploadSection -->|"DELETE /api/v1/documents/:id"| deleteAPI["204"]
    end
```
