using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Model.Entities;

namespace backend.Model.DTOs;

public class ScheduledProgramDTO
{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string? Name { get; set; }
    public DateTime? Start { get; set; }
    public DateTime? End { get; set; }
    public decimal? Cost { get; set; }
    public List<long> ParticipantIds { get; set; }
}
