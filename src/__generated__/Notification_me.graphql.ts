/**
 * @generated SignedSource<<9a7ea85a3e52e26559b93e05281dda5e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NotificationTypesEnum = "ARTICLE_FEATURED_ARTIST" | "ARTWORK_ALERT" | "ARTWORK_PUBLISHED" | "PARTNER_SHOW_OPENED" | "VIEWING_ROOM_PUBLISHED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Notification_me$data = {
  readonly notification: {
    readonly artworks: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
          readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly totalCount: number | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly notificationType: NotificationTypesEnum;
    readonly publishedAt: string;
    readonly title: string;
  } | null | undefined;
  readonly " $fragmentType": "Notification_me";
};
export type Notification_me$key = {
  readonly " $data"?: Notification_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Notification_me">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "notificationId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Notification_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "notificationId"
        }
      ],
      "concreteType": "Notification",
      "kind": "LinkedField",
      "name": "notification",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "notificationType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "RELATIVE"
            }
          ],
          "kind": "ScalarField",
          "name": "publishedAt",
          "storageKey": "publishedAt(format:\"RELATIVE\")"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": "artworks",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 10
            }
          ],
          "concreteType": "ArtworkConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtworkEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ShelfArtwork_artwork"
                    },
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artworksConnection(first:10)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "2767168aa1f85887b14d2c86ad5dda56";

export default node;
