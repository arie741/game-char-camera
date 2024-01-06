import Character from "@/components/character";

export default function Home() {
  return (
    <main>
      <Character 
        position={{
          x: "50%",
          y: "50%",
        }}
        size={{
          width: 100,
          height: 300,
        }}
      />
    </main>
  )
}
