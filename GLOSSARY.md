# Glossary

| Term | Meaning |
| --- | --- |
| Account | A configured identity and authorization relationship with an email provider. |
| Adapter | Provider-specific implementation behind the provider-independent application contract. |
| Attachment | A message part or user-selected file associated with a draft or message. |
| Cache | Bounded local copy of provider data available for faster or offline use; it does not imply ownership of remote data. |
| Capability | An operation or behavior that a provider/account supports, such as labels, move, search, or drafts. |
| Conversation / thread | A group of related messages as determined by provider metadata or client fallback rules. |
| Draft | Editable message content not yet confirmed as sent. May exist locally, remotely, or both. |
| Mailbox | A provider location or view, such as inbox, sent, archive, trash, or a label. |
| Mutation | A user-requested change to provider state, such as mark read, move, or delete. |
| Provider | The email service or protocol endpoint that stores and serves an account's mail. |
| Reconciliation | Checking provider state after an uncertain operation outcome before deciding whether to retry. |
| Sync cursor | Provider-specific token or position used to request changes since a previous synchronization. |
| Tombstone | Local record that a remotely stored item was deleted or removed, retained as needed to reconcile sync. |
