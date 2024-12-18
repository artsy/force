/**
 * @generated SignedSource<<8b9539880f0cd841e999bf61901df29a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type GeneShow_gene$data = {
  readonly artistsConnection:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly href: string | null | undefined
                        readonly internalID: string
                        readonly name: string | null | undefined
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
  readonly displayName: string | null | undefined
  readonly formattedDescription: string | null | undefined
  readonly internalID: string
  readonly name: string | null | undefined
  readonly similar:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly href: string | null | undefined
                        readonly internalID: string
                        readonly name: string | null | undefined
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
  readonly " $fragmentSpreads": FragmentRefs<"GeneMeta_gene">
  readonly " $fragmentType": "GeneShow_gene"
}
export type GeneShow_gene$key = {
  readonly " $data"?: GeneShow_gene$data
  readonly " $fragmentSpreads": FragmentRefs<"GeneShow_gene">
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "internalID",
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v2 = [
      {
        kind: "Literal",
        name: "first",
        value: 10,
      },
    ],
    v3 = [
      v0 /*: any*/,
      v1 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "href",
        storageKey: null,
      },
    ]
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "GeneShow_gene",
    selections: [
      {
        args: null,
        kind: "FragmentSpread",
        name: "GeneMeta_gene",
      },
      v0 /*: any*/,
      v1 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "displayName",
        storageKey: null,
      },
      {
        alias: "formattedDescription",
        args: [
          {
            kind: "Literal",
            name: "format",
            value: "HTML",
          },
        ],
        kind: "ScalarField",
        name: "description",
        storageKey: 'description(format:"HTML")',
      },
      {
        alias: null,
        args: v2 /*: any*/,
        concreteType: "GeneConnection",
        kind: "LinkedField",
        name: "similar",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "GeneEdge",
            kind: "LinkedField",
            name: "edges",
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "Gene",
                kind: "LinkedField",
                name: "node",
                plural: false,
                selections: v3 /*: any*/,
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: "similar(first:10)",
      },
      {
        alias: null,
        args: v2 /*: any*/,
        concreteType: "ArtistConnection",
        kind: "LinkedField",
        name: "artistsConnection",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "ArtistEdge",
            kind: "LinkedField",
            name: "edges",
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "Artist",
                kind: "LinkedField",
                name: "node",
                plural: false,
                selections: v3 /*: any*/,
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: "artistsConnection(first:10)",
      },
    ],
    type: "Gene",
    abstractKey: null,
  }
})()
;(node as any).hash = "9f82e516e605dea8561c809cad284284"

export default node
